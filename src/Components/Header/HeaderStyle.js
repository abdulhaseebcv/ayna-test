import styled from "styled-components"

export const Row = styled.header`
width: 100%;
height: 70px;
background:#fff ;
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);
padding: 0 2%;
`;

export const LeftSection = styled.div`
display: flex;
align-items: center;
gap: 5px;
h2 {
    font-size: clamp(16px,1.54vw,23px);
    color: #494C68;
    text-transform: capitalize;
}
`;

export const Logo = styled.img`
height: 70px;
`;

export const RightSection = styled.div`
button {
    padding: 8px;
    font-size: clamp(12px,0.934vw,15px);;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    background: #081c34;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    span {
    display: flex;
    align-items: center;
    transition: .1s ease-in-out;
    }
&:hover {
    background: #0056b3;
}
@media (max-width:768px) {
      padding  :6px ;
    }
}
`;
