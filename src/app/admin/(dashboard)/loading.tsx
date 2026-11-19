/** Shimmer skeleton shown while an admin page loads. */
export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="flex items-center gap-4">
        <div className="admin-skeleton h-[50px] w-[50px]" />
        <div className="grid gap-2">
          <div className="admin-skeleton h-3 w-24" />
          <div className="admin-skeleton h-7 w-56" />
        </div>
      </div>
      <div className="admin-stats">
        {[0, 1, 2, 3].map((i) => <div key={i} className="admin-skeleton h-[120px]" style={{ borderRadius: 16 }} />)}
      </div>
      <div className="admin-skeleton h-16" style={{ borderRadius: 16 }} />
      <div className="mt-4 grid gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="admin-skeleton h-12" />)}
      </div>
    </div>
  );
}
