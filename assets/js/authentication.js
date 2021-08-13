import gql from 'graphql-tag'

export async function authenticate(app, identifier, password) {
  try {
    const res = await app.$apollo.mutate({
      mutation: gql`mutation($identifier: String!, $password: String!) {
        login(
          input: { identifier: $identifier, password: $password }
        ) {
          jwt
          user {
            id
            username
          }
        }
      }
      `,
      variables: { identifier, password }
    })
    .then(({ data }) => data)
    await app.$apolloHelpers.onLogin(res.login.jwt)
    app.$store.commit('setItAuthenticated', true)
    console.log('Logged in as', res.login)
  }
  catch (e) {
    console.error(e)
  }
}

export async function register(app, email, password, username) {
  const isUserVerified = () => {
    // do LDAP verification on production server
    return true
  }

  if (isUserVerified()) {
    try {
      const res = await app.$apollo.mutate({
        mutation: gql`mutation($email: String!, $password: String!, $username: String!) {
          register(
            input: { email: $email, password: $password, username: $username }
          ) {
            jwt
            user {
              id
              username
            }
          }
        }
        `,
        variables: { email, password, username }
      })
      .then(({ data }) => data)
      await app.$apolloHelpers.onLogin(res.register.jwt)
      app.$store.commit('setItAuthenticated', true)
      console.log('Logged in as', res.register)
    }
    catch (e) {
      console.error(e)
    }
  }
}