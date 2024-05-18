import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import styled from "styled-components";

export const EmojisContainer = styled.div`
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
`;

export const EmojiPickerContainer = styled(EmojiPicker)`
`;