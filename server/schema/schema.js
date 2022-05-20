const graphql = require('graphql');
const graphqlScalars = require('graphql-scalars');
const {GraphQLDate} = graphqlScalars;
const {GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull} = graphql;
const Posts = require('../models/posts');
const Users = require('../models/users');

const SignUpType = new GraphQLObjectType({
    name: 'SignUpType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        surname: {type: new GraphQLNonNull(GraphQLString)},
        birthdate: {type: new GraphQLNonNull(GraphQLDate)},
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const LogIn = new GraphQLObjectType({
    name: 'LogIn',
    fields: () => ({
        id: {type: GraphQLID},
        phone: {type: GraphQLString},
        password: {type: GraphQLString}
    })
});

const UserDataType = new GraphQLObjectType({
    name: 'UserDataType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        surname: {type: new GraphQLNonNull(GraphQLString)},
        birthdate: {type: new GraphQLNonNull(GraphQLDate)},
        phone: {type: new GraphQLNonNull(GraphQLString)},
    })
});

const PostsType = new GraphQLObjectType({
    name: 'PostsType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        published: {type: new GraphQLNonNull(GraphQLDate)},
        content: {type: new GraphQLNonNull(GraphQLString)},
    })
});

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
                name: {type: new GraphQLNonNull(GraphQLString)},
                surname: {type: new GraphQLNonNull(GraphQLString)},
                birthdate: {type: new GraphQLNonNull(GraphQLDate)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const user = new Users({
                    name: args.name,
                    surname: args.surname,
                    birthdate: args.birthdate,
                    phone: args.phone,
                    password: args.password
                });
                return user.save();
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
                id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                surname: {type: new GraphQLNonNull(GraphQLString)},
                birthdate: {type: new GraphQLNonNull(GraphQLDate)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                return Users.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            surname: args.surname,
                            birthdate: args.birthdate,
                            phone: args.phone,
                            password: args.password
                        }
                    },
                    {new: true}
                )
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getPosts: {
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
            type: UserDataType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
