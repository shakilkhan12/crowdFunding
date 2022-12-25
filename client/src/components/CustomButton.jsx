const CustomButton = ({ btnType, title, handleClick, styles }) => {
    return (
      <button
        type={btnType}
        className={`font-epilogue font-semibold text-[14px] leading-[26px] text-white py-2 px-4 rounded-lg ${styles}`}
        onClick={handleClick}
      >
        {title}
      </button>
    )
  }

export default CustomButton