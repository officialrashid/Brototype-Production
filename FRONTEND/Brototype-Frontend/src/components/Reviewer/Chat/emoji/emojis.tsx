import React from 'react';
import PropTypes from 'prop-types'
import {EmojisContainer,EmojiPickerContainer} from "./emojis.styles"
const Emojis = ({pickEmoji}:{pickEmoji:any}) => {
    return (
      <EmojisContainer>
        {
            <EmojiPickerContainer onEmojiClick={pickEmoji} />
        }
      </EmojisContainer>
    );
}
Emojis.propTypes = {
    pickEmoji : PropTypes.func
}

export default Emojis;
