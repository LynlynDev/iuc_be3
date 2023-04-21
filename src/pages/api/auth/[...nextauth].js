import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import clientPromise from './lib/mongodb'

db.connectDB();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
        name:"Credentials",

        credentials:{
            username: { label:"Username", type: "text", placeholder: "jsmith" },
            password: { label:"Password", type: "password" }
        },
        async authorize(credentials, req) {
            const email = credentials.email;
            const password = credentials.password;
            const user = await User.findOne({email})
            if(user) {
                return SignInUser({password, user})
            }else{
                throw new Error("This email does not exist")
            }
        }
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    
    //
// }),
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER
    }),

    GitHubPrrovider({
        clientId: process.env.GITHUB_ID,
        clientSecret: porcess.env.GITHUB_SECRET
    }),



    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),
  ],
  callbacks: {
    async session({session, token}){
        let user = await User.findById(token.sub);
        session.user.id = token.sub || user._id.toString();
        session.user.role = user.role || 'user'
        token.role = user.role || 'user'
        return session
    }
  },
  pages:{
    signIn: "/signin"
  },
  session:{
    strategy: "jwt"
  },
  secret:process.env.JWT_SECRET
})

const SignInUser = async({password, user})=>{
    if(!user.password){
        throw new Error('Please enter your password')
    }
    const testPassword = await bcrypt.compare(password, user.password)
    if(!testPassword){
        throw new Error("Email or password is wrong !")
    }
    return user
}