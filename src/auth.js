import { createAuthProvider } from 'react-token-auth';

// type Session = { accessToken: string; refreshToken: string };

export const { useAuth, authFetch, login, logout } = createAuthProvider({
    accessTokenKey: 'access_token',
    onUpdateToken: (token) => fetch('/auth/refresh', {
        method: 'POST',
        body: token.refresh_token
    })
    .then(r=>r.json())
})



