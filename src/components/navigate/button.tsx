import Link from "next/link";

interface ButtonProps {
  pathname: string,
  pageNum: number,
  currentPage: number,
  pageSize: number,
}


const PageButton: React.FC<ButtonProps> = (props) => {
  const { pathname, pageNum, currentPage, pageSize } = props;

  return (
    <Link
      href={{
        pathname: pathname,
        query: { current: pageNum, pageSize: pageSize }
      }}
      
    >
      <div className={`flex justify-center items-center w-10 h-10 rounded hover:bg-gray-300 ${
        pageNum == currentPage ? "border-1 border-blue-500 text-blue-500" : ""
      }`}>
        {pageNum}
      </div>
    </Link>
  );
}

export default PageButton;