const Button = ({ onClick, children}) => {
 return <button 
  className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
  onClick={ onClick }
 >
   {children}
 </button>
}
export default Button;