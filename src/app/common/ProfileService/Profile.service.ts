import { API } from '../API/API';
import { HEADERS } from "../API/Headers";
import { Profile } from "./ProfileService.interface";

export class ProfileService  {

    public getAllProfiles(): Promise<Profile[]> {
        return fetch(API.profiles, {
            method: 'GET',
            mode: 'cors',
        }).then(res => res.json())
            .catch(err => console.log(err));
    }

    public getProfileById(id: string): Promise<Profile> {
        return fetch(`${API.profile}/?id=${id}`, {
            method: 'GET',
            mode: 'cors',
        }).then(res => res.json())
            .catch(err => console.log(err));
    }

    public createProfile(profile: Profile): Promise<Profile[]> {
        return fetch(API.profile, {
            method: 'POST',
            body: JSON.stringify({...profile}),
            headers: HEADERS
        }).then(res => res.json())
            .catch(err => console.log(err));
    }

    public updateProfileById(data: any): Promise<Profile[]> {
        return fetch(API.profile, {
            method: 'PUT',
            body: JSON.stringify({...data}),
            headers: HEADERS
        }).then(res => res.json())
            .catch(err => console.log(err));
    }
}
