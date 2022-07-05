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
const {PostsType, SignUpType, LogInType, UserDataType, NoteType, GetUserDataType} = types;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostsType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                published: {type: new GraphQLNonNull(GraphQLDate)},
                content: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const post = new Posts({
                    name: args.name,
                    published: args.published,
                    content: args.content
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
            resolve(parent, args) {
                const user = new Users({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    birthdate: args.birthdate,
                    phone: args.phone,
                    password: bcrypt.hashSync(args.password, bcrypt.genSaltSync())
                });
                return user.save();
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
                password: {type: new GraphQLNonNull(GraphQLString)},
                token: {type: GraphQLString}
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
                        )

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
                theme: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                category: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const notes = new Notes({
                    theme: args.theme,
                    content: args.content,
                    category: args.category
                });
                return notes.save();
            }
        },
        removeNote: {
            type: NoteType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Notes.findByIdAndRemove(args.id)
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
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        },
        getAllNotes: {
            type: new GraphQLList(NoteType),
            resolve(parent, args) {
                return Notes.find({})
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
