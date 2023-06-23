export interface AppUser {
    id?: number,
    email: string,
    username: string,
    password?: string,
    profileImage?: string,
    profilePreviewImage?: string
}

export interface AppUserListEntry {
    username: string,
    profilePreviewImage: string
}

export interface ItemDefinition {
    id?: number,
    creator_id: number,
    name: string,
    minimum?: number,
    maximum?: number
}

export interface DailyItemEntry{
    id?: number,
    user_id: number,
    item_id: number,
    date: string,
    value?: number,
    notes: string
}
