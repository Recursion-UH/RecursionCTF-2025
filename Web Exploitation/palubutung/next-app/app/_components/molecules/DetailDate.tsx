interface DetailDateProps {
  date: string;
  views: number;
}

const DateViews = (props: DetailDateProps) => {
  const { views, date } = props;
  return (
    <span className="flex gap-2 text-text-s font-normal text-[#7C7C7C]">
      {date} • Telah dilihat {views} kali
    </span>
  );
};

export default DateViews;
