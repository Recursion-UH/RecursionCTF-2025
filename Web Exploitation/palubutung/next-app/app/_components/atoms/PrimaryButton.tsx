interface PrimaryButtonProps {
    children: React.ReactNode;
  }
  
  const PrimaryButton = (props: PrimaryButtonProps) => {
    const { children } = props;
    return (
      <button className="rounded flex w-[140px] h-[45px] px-[7px] py-px justify-center items-center bg-primary-dark-hover text-heading-s font-medium text-secondary-white">
        {children}
      </button>
    );
  };
  
  export default PrimaryButton;