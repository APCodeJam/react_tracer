import { api } from './api';
import { DailyItemEntry } from '../types';

const dailyItemEntrySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getDailyItemEntries: builder.query<DailyItemEntry, string>({
            query: () => `itemDefinition/${localStorage.getItem('userId')}`,
            providesTags: ['DailyItemEntry'],
        }),
        createDailyItemEntry: builder.mutation<DailyItemEntry, DailyItemEntry>({
            query(body) {
                return {
                    url: `dailyItemEntry/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        updateDailyItemEntry: builder.mutation<DailyItemEntry, DailyItemEntry>({
            query(body) {
                return {
                    url: 'dailyItemEntry/',
                    method: 'PUT',
                    body,
                }
            }
        }),
        deleteDailyItemEntry: builder.mutation<DailyItemEntry, string>({
            query: (id) => ({
                url: `dailyItemEntry/${id}`,
                method: 'DELETE',
              }),
        }), 
    }),
    overrideExisting: false
})

export const {useGetDailyItemEntriesQuery,
    useCreateDailyItemEntryMutation,
    useUpdateDailyItemEntryMutation,
    useDeleteDailyItemEntryMutation} = dailyItemEntrySlice
