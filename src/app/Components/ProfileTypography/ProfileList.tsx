import React, { Component } from 'react';
import { map } from 'lodash';
import { ProfileService } from "../../common/ProfileService/Profile.service";
import { Profile, Profiles } from "../../common/ProfileService/ProfileService.interface";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import './ProfileList.scss'

export class ProfileList extends Component {
    state = {
        ready: false,
        profileList: [],
    };

    private profileServiceService: ProfileService;
    private readonly profiles: Profile[];
    public classes: any;
    public props: Profiles;

    constructor(props: Profiles) {
        super(props);
        this.props = props;
        this.profiles = props.profiles;
        this.profileServiceService = new ProfileService();
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    public componentDidMount(): void {
        this.setState({
            profileList: this.profiles,
            ready: true
        });
    }

    public async onUpdateSubmit (): Promise<void> {
        this.setState({
            profileList: await this.profileServiceService.getAllProfiles()
        });
    }

    public componentDidUpdate(prevProps: Readonly<Profiles>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.profiles !== prevProps.profiles) {
            this.setState({
                profileList: this.props.profiles,
            });
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <React.Fragment>
                <h1 className='head-title'>Profile List</h1>
                <div className='card-container'>
                    {
                        this.state.ready &&
                        this.state.profileList.length > 0
                            && map(this.state.profileList, (profile: Profile) =>
                                <div className='card' key={profile.id}>
                                    <ProfileCard profile={profile}
                                        onSubmit={this.onUpdateSubmit}/>
                                </div>
                            )
                    }
                </div>
            </React.Fragment>
        )
    }
}
