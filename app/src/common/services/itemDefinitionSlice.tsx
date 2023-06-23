import { api } from './api';
import { ItemDefinition } from '../types';

const itemDefinitionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllItemDefinitions: builder.query<ItemDefinition, string>({
            query: () => `itemDefinition/${localStorage.getItem('userId')}`,
            providesTags: ['ItemDefinition'],
        }),
        createItemDefinition: builder.mutation<ItemDefinition, ItemDefinition>({
            query(body) {
                return {
                    url: `itemDefinition/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        updateItemDefinition: builder.mutation<ItemDefinition, ItemDefinition>({
            query(body) {
                return {
                    url: 'itemDefinition/',
                    method: 'PUT',
                    body,
                }
            }
        }),
        deleteItemDefinition: builder.mutation<ItemDefinition, string>({
            query: (id) => ({
                url: `itemDefinition/${id}`,
                method: 'DELETE',
              }),
        }),
    }),
    overrideExisting: false
})

export const {useGetAllItemDefinitionsQuery, 
    useCreateItemDefinitionMutation,
    useUpdateItemDefinitionMutation,
    useDeleteItemDefinitionMutation, } = itemDefinitionSlice
