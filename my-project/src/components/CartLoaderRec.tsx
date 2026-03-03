
import ContentLoader from "react-content-loader"

const CartLoaderRec = (props) => (
  <ContentLoader 
    speed={2}
    width='44rem'
    height='9.5rem'
    viewBox="0 0 44rem 9.5rem"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9rem" y="1rem" rx="5" ry="5" width="26.7rem" height="3.5rem" /> 

    <rect x="0" y="1rem" rx="5" ry="5" width="7rem" height="7rem" /> 

    <rect x="9rem" y="5.5rem" rx="5" ry="5" width="7rem" height="2.2rem" /> 

    <rect x="30rem" y="5.5rem" rx="5" ry="5" width="5.5rem" height="2.2rem" />
  </ContentLoader>
)

export default CartLoaderRec