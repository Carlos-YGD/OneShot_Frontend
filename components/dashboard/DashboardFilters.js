export default function DashboardFilters({ search, setSearch, filter, setFilter, sort, setSort, resetFilters }) {
  return (
    <div className="mb-5 flex flex-wrap gap-3 items-center justify-center">
      <input
        type="text"
        placeholder="Search by ID, username, email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-2 py-1 border bg-[#f8eed5]"
      />

      <label className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        <input
          type="checkbox"
          checked={filter.is_admin}
          onChange={(e) => setFilter((prev) => ({ ...prev, is_admin: e.target.checked }))}
        />{" "}
        Admin
      </label>

      <label className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        <input
          type="checkbox"
          checked={filter.is_staff}
          onChange={(e) => setFilter((prev) => ({ ...prev, is_staff: e.target.checked }))}
        />{" "}
        Staff
      </label>

      <label className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        Status:{" "}
        <select value={filter.status} onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      <button onClick={resetFilters} className="
                  font-bold
                  px-2 py-1
                  bg-[#c8a389]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]
                ">Reset Filters</button>

      <label className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]">
        Sort by:
        <select value={sort.field} onChange={(e) => setSort((prev) => ({ ...prev, field: e.target.value }))} className="ml-1">
          <option value="id">ID</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </label>

      <select className="px-2 py-1 border font-bold
                  px-2 py-1
                  bg-[#e9d196]
                  border border-[#4f4735]
                  shadow-[2px_2px_0_#000]
                  hover:shadow-[1px_1px_0_#000]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  active:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px]" value={sort.direction} onChange={(e) => setSort((prev) => ({ ...prev, direction: e.target.value }))}>
        <option value="asc">A-Z / 0-9</option>
        <option value="desc">Z-A / 9-0</option>
      </select>
    </div>
  );
}
