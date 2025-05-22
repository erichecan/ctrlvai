import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../database'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // 检查/创建用户记录
      const existingUser = await db
        .selectFrom('users')
        .select(['id'])
        .where('email', '=', user.email!)
        .executeTakeFirst()

      if (!existingUser) {
        await db
          .insertInto('users')
          .values({
            email: user.email!,
            name: user.name || '',
            image: user.image || null,
            created_at: new Date().toISOString()
          })
          .execute()
      }
      return true
    },
    async session({ session }) {
      // 添加自定义session字段
      const user = await db
        .selectFrom('users')
        .select(['id', 'role'])
        .where('email', '=', session.user.email!)
        .executeTakeFirst()

      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id,
          role: user?.role || 'user'
        }
      }
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)