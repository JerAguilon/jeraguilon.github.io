import * as React from 'react';

import './SubscribeForm.css'

export class SubscribeForm extends React.Component<{}, {}> {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (
            <>
                <div id="mc_embed_signup">
                    <form action="https://gmail.us20.list-manage.com/subscribe/post?u=89b82aa7c6193802758f54684&amp;id=2952e5543b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate={true}>
                        <div id="mc_embed_signup_scroll">
                            <label htmlFor="mce-EMAIL">Found this helpful? Subscribe to hear about new inteview tip articles.</label>
                            <input type="email" defaultValue="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required></input>
                            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden={true}>
                                <input type="text" name="b_89b82aa7c6193802758f54684_2952e5543b" tabIndex={-1} defaultValue=""></input>
                            </div>
                            <div className="clear">
                                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
                            </div>
                            <label><small>You will only be getting emails about articles. I hate spam, too!</small></label>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
