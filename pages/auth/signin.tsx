import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn as SignInAsProvider } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Header from "../../components/Header";

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-50 px-14 text-center">
        <img className="w-80" src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration-958x575.png"/>
        <p className="font-xs italic"> This is not a real app, it is build for educational purposes only</p>
        <div className="mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
                onClick={() => SignInAsProvider(provider.id, { callbackUrl: '/'})}
                className="p-3 bg-blue-500 rounded-lg text-white">
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      </div>
   </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to th  e same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}