import { ApolloServer, gql } from "apollo-server";

const users = [
  {
    id: 1,
    name: "Martin",
    username: "tincho",
    phone: "01123455667",
    address: {
      street: "Los Alamos 123",
      city: "Cordoba",
      country: "Argentina",
    },
  },
  {
    id: 2,
    name: "Jose",
    username: "joseph",
    phone: "01123455667",
    address: {
      street: "Los Bananos 123",
      city: "Cordoba",
      country: "Argentina",
    },
  },
  {
    id: 3,
    name: "Mathias",
    username: "mathx",
    phone: "01123455667",
    address: {
      street: "Los Monos 123",
      city: "Cordoba",
      country: "Argentina",
    },
  },
  {
    id: 4,
    name: "Sofia",
    username: "sophi3",
    phone: "01123455667",
    address: {
      street: "Los Simpsons 123",
      city: "Cordoba",
      country: "Argentina",
    },
  },
  {
    id: 5,
    name: "Julia",
    username: "july",
    phone: "01123455667",
    address: {
      street: "Los Padrinos Magicos 123",
      city: "Cordoba",
      country: "Argentina",
    },
  },
];

const type = gql`
  type User {
    id: ID!
    name: String!
    phone: Int
    address: Address!
  }

  type Address {
    street: String!
    city: String!
    country: String!
  }

  type Query {
    usersCount: Int!
    allUsers: [User]!
    getUser(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    usersCount: () => {
      // Get from Database
      return users.length;
    },
    allUsers: () => {
      // Get from Database
      return users;
    },
    getUser: (root, args) => {
      const { id } = args;
      const User = users.find((user) => {
        return user.id === id;
      });
      return User;
    },
  },
  User: {
    //address: (root) => `${root.add} - ${root.country}`,
  },
};

const server = new ApolloServer({
  typeDefs: type,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`GraphQL Server Ready @ Apollo Server`);
});
