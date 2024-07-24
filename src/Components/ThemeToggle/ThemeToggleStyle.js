import styled from "styled-components"

export const ToggleContainer = styled.div`
display: flex;
align-items: center;
gap: 5px; 
color: ${props=>props.$isDark ? '#ffffff' : '#000000'};
`;