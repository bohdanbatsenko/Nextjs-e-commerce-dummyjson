import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GraphQLClient, gql } from 'graphql-request';
import { log } from 'console';

const client = new GraphQLClient('https://magento.test/graphql');

console.log('api/auth/[...nextauth]/route.ts fired');

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'magento',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const query = gql`
            mutation login($email: String!, $password: String!) {
              generateCustomerToken(email: $email, password: $password) {
                token
              }
            }
          `;

          const data = await client.request(query, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (data.generateCustomerToken.token) {
            return { id: 1, name: credentials?.email, token: data.generateCustomerToken.token };
          }

          return null;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);