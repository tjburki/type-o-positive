import React from 'react';

function DonateButton() {
    return (
        <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="business" value="J8TJRWKBKF73G" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value="Wanted to create a cool typing test. Keeping a site up isn't free unfortunately.  Thanks!" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
    );
}

export default DonateButton;