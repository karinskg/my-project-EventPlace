
import ContentLoader from "react-content-loader"

const CartLoader = (props) => (
  <ContentLoader 
    speed={2}
    width='32rem'
    height='31.8rem'
    viewBox="0 0 32rem 31rem"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="1.1rem" rx="13" ry="13" width="30rem" height="15rem" /> 
    <rect x="0" y="17.5rem" rx="5" ry="5" width="30rem" height="2rem" /> 
    <rect x="0" y="20.6rem" rx="5" ry="5" width="26rem" height="1.8rem" /> 
    <rect x="0" y="23.6rem" rx="5" ry="5" width="18rem" height="4.2rem" /> 
    <rect x="0" y="29.1rem" rx="5" ry="5" width="8rem" height="2.2rem" />
  </ContentLoader>
)

export default CartLoader