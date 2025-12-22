export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        Previous
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        Next
      </button>
    </div>
  );
}
