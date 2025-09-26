// import { log } from 'console';
// import cookie from 'cookie';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GenerateCustomerTokenResponseType, GENERATE_CUSTOMER_TOKEN } from '@/lib/mutations/GenerateCustomerToken';

export const useLogin = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const [generateCustomerToken, { loading }] = useMutation<GenerateCustomerTokenResponseType
>(GENERATE_CUSTOMER_TOKEN);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await generateCustomerToken({
        variables: { email, password },
      });

      if (data?.generateCustomerToken?.token) {
        // Set the token in a cookie (note: httpOnly cannot be set from client-side)
        const customerToken = data.generateCustomerToken.token;
        console.log('customerToken', customerToken)

        document.cookie = `token=${customerToken}; path=/; max-age=${60 * 60 * 24 * 7}; secure=${process.env.NODE_ENV !== 'development'}`;

        setLoginSuccess(true);
        setLoginError(null);
      }
    } catch (error) {
      setLoginError(error.message);
      setLoginSuccess(false);
    }
  };

  return {
    login,
    loading,
    loginError,
    loginSuccess,
  };
}

export async function login(email, password) {
  // const query = `
  //   mutation Login($email: String!, $password: String!) {
  //     generateCustomerToken(email: $email, password: $password) {
  //       token
  //     }
  //   }
  // `;

  // const variables = {
  //   email,
  //   password,
  // };

  // try {
  //   const response = await fetch('https://magento.test/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query,
  //       variables,
  //     }),
  //   });

  //   const result = await response.json();

  //   if (result.errors) {
  //     throw new Error(result.errors[0].message);
  //   }

  //   const token = result.data.generateCustomerToken.token;
  //   console.log('generateCustomerToken token', token)

    // Store the token in an HTTP-only cookie
    // document.cookie = cookie.serialize('token', token, {
    //   httpOnly: true, // Note: This flag is not supported in client-side JavaScript
    //   secure: process.env.NODE_ENV !== 'development',
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   path: '/',
    // });

  //   return { success: true };
  // } catch (error) {
  //   console.error('Login error:', error);
  //   return { success: false, message: error.message };
  // }
}
