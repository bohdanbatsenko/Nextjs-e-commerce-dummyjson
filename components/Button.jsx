const Button = ({ disabled=false, onClick, children}) => {
 return <button 
  className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-700'
  onClick={ onClick }
  disabled={disabled}
 >
   {children}
 </button>
}
export default Button;