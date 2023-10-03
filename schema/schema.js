const graphql = require('graphql');
const graphqlScalars = require('graphql-scalars');
const {GraphQLDate} = graphqlScalars;
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull} = graphql;
const Posts = require('../models/posts');
const Users = require('../models/users');
const Notes = require('../models/notes');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const types = require('./types');
const {PostsType, SignUpType, LogInType, UserDataType, NoteType, GetUserDataType, RemoveNoteType} = types;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostsType,
            args: {
                authorName: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const post = new Posts({
                    authorName: args.authorName,
                    authorId: args.authorId,
                    content: args.content,
                    title: args.title,
                    published: new Date().toISOString()
                });
                return post.save();
            }
        },
        addNewUser: {
            type: SignUpType,
            args: {
                firstname: {type: GraphQLString},
                lastname: {type: GraphQLString},
                birthdate: {type: GraphQLDate},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                const existedUser = await Users.findOne({phone: args.phone});
                try {
                    if(existedUser?.phone === args.phone) {
                        throw new Error('You are already registered')
                    } else {
                        const user = new Users({
                            firstname: args.firstname,
                            lastname: args.lastname,
                            birthdate: args.birthdate,
                            phone: args.phone,
                            password: bcrypt.hashSync(args.password, bcrypt.genSaltSync()),
                            token: ''
                        });
                        return user.save();
                    }
                } catch (e) {
                    throw new Error(e)
                }
            }
        },
        logIn: {
            type: LogInType,
            args: {
                id: {type: GraphQLID},
                firstname: {type: GraphQLString},
                lastname:{type: GraphQLString},
                birthdate: {type: GraphQLDate},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {

                const user = await Users.findOne({phone: args.phone});
                try {
                    if (user) {
                        if (user.phone !== args.phone) {
                            throw new Error('You are not registered')
                        }

                        const valid = bcrypt.compareSync(args.password, user.password)

                        if (!valid) {
                            throw new Error('Incorrect password')
                        }

                        const token = jwt.sign(
                            {id: user.id},
                            process.env.JWT_SECRET_KEY,
                            {expiresIn: '1d'}
                        );

                        await user.updateOne({token});

                        return {
                            id: user.id,
                            phone: user.phone,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            birthdate: user.birthdate,
                            token
                        }
                    } else {
                        throw new Error('You are not registered')
                    }
                } catch (e) {
                    throw new Error(e)
                }
            }
        },
        removePost: {
            type: PostsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Posts.findByIdAndRemove(args.id)
            }
        },
        removeUser: {
            type: UserDataType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findByIdAndRemove(args.id)
            }
        },
        updateUserData: {
            type: UserDataType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                firstname: {type: GraphQLString},
                lastname:{type: GraphQLString},
                birthdate: {type: GraphQLDate},
                phone: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Users.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            firstname: args.firstname,
                            lastname: args.lastname,
                            birthdate: args.birthdate,
                            phone: args.phone,
                            password: args.password ? bcrypt.hashSync(args.password, bcrypt.genSaltSync()) : args.password
                        }
                    },
                    {new: true}
                )
            }
        },
        addNote: {
            type: NoteType,
            args: {
                authorId: {type: new GraphQLNonNull(GraphQLID)},
                theme: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                category: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const notes = new Notes({
                    authorId: args.authorId,
                    theme: args.theme,
                    content: args.content,
                    category: args.category
                });
                return notes.save();
            }
        },
        removeNote: {
            type: RemoveNoteType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                Notes.findByIdAndRemove({"_id": args.id}, (err, docs) => {
                    if (err){
                        return {res: err.toString()}
                    } else {
                        return {res: docs.toString()}
                    }
                });
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllPosts: {
            type: new GraphQLList(PostsType),
            resolve(parent, args) {
                return Posts.find({})
            }
        },
        getPost: {
            type: PostsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Posts.findById(args.id)
            }
        },
        getUserData: {
            type: GetUserDataType,
            resolve(parent, args, contextValue) {
                const token = contextValue.headers.authorization.split(' ')[1];
                if(token) {
                    try {
                        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
                            if (err) {
                                throw new Error(err)
                            }
                        });
                    } catch (e) {
                        throw new Error(e)
                    }
                }
                return Users.findOne({"token": token});
            }
        },
        getAllNotes: {
            type: new GraphQLList(NoteType),
            args: {
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Notes.find({"authorId": args.authorId})
            }
        },
        getOtherMembers: {
            type: new GraphQLList(GetUserDataType),
            resolve(parent, args, contextValue) {
                const token = contextValue.headers.authorization.split(' ')[1];
                return Users.find({
                    $and: [
                        { token: { $ne: token } }, // token not equal current user token
                        { token: { $ne: "" } } // token not empty
                    ]
                });
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
