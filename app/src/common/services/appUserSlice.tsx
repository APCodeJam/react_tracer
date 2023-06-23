import { api } from './api';
import { AppUser, AppUserListEntry } from '../types';

const pageSize = 10;

const appUserSlice = api.injectEndpoints({

    endpoints: (builder) => ({
        getAllUsernames: builder.query<AppUserListEntry[], string>({
            query: () => '/user/all'
        }),
        getPagedUsernames: builder.query<AppUserListEntry[], number>({
            //the API starts at page 0 but users will expect pages to start at 1
            query: (page) => `/user/${page-1}/${pageSize}`
        }),
        getUserByUserName: builder.query<AppUser, string>({
            query: (name) => `user/profile/${name}`
        }),
        registerAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: `user/register`,
                    method: 'POST',
                    body,
                }
            },
        }),
        loginAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: `user/login`,
                    method: 'POST',
                    body,
                    responseHandler: async (response) => {
                        let token = await response.headers.get('authorization')

                        if (token) {
                            localStorage.setItem('token',token)
                        }

                        localStorage.setItem('appUser', body.username);
                        localStorage.setItem('userId', (body.id) ? body.id.toString() : "0");
                        console.log(localStorage.getItem('userId'))
                        return response.json()
                    }
                }
            },
        }),
        updateAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: 'user/profile',
                    method: 'PUT',
                    body,
                }
            }
        }),
        logoutAppUser: builder.mutation<null, string>({
            query: () => ({
                url: 'user/logout',
                responseHandler: (response) => {
                    localStorage.setItem('token',''); 
                    localStorage.removeItem('appUser');
                    return response.text()},
              })
        }),
        // addItemDefinition: builder.mutation<null, string>({
        //     query: (body) => ({
        //         url: 'itemDefinition',
        //         responseHandler: (response) => {
        //             localStorage.setItem('token', '');
        //             return {
        //                 body
        //             }
        //         }
        //     })

        // })
    }),
    overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByUserNameQuery, 
    useRegisterAppUserMutation, 
    useLoginAppUserMutation, 
    useUpdateAppUserMutation, 
    useGetAllUsernamesQuery,
    useGetPagedUsernamesQuery,
    useLogoutAppUserMutation, } = appUserSlice
