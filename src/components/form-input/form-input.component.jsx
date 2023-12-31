// CSS STYLES
import "./form-input.styles.scss";

// THE VARIENT WITH JUST otherProps
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

// THE VARIENT THE MAKING otherProps OBJECT AND NAME IT inputOptions
// const FormInput = ({ label, inputOptions }) => {
//   return (
//     <div className="group">
//       <input className="form-input" {...inputOptions} />
//       {label && (
//         <label
//           className={`${
//             inputOptions.value.length ? "shrink" : ""
//           } form-input-label`}
//         >
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

// export default FormInput;
