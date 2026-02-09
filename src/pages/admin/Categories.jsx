import { useEffect, useMemo, useState } from "react";
import { ADMIN_THEME } from "../../utils/adminTheme.jsx";
import AdminInput from "../../components/admin/AdminInput.jsx";
import AdminButton from "../../components/admin/AdminButton.jsx";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categories";

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </th>
  );
}

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refresh = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = await getCategories();
      setItems(data.categories ?? []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => c.name.toLowerCase().includes(q));
  }, [items, query]);

  const onCreate = async () => {
    setError("");
    setSuccess("");

    const name = newName.trim();
    if (!name) {
      setError("Category name is required");
      return;
    }

    try {
      const data = await createCategory({ name });
      setSuccess(data.message || "Category created");
      setNewName("");
      await refresh();
    } catch (e) {
      setError(e?.response?.data?.message || "Create failed (are you admin?)");
    }
  };

  const startEdit = (cat) => {
    setSuccess("");
    setError("");
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const onUpdate = async () => {
    setError("");
    setSuccess("");

    const name = editName.trim();
    if (!name) {
      setError("Category name is required");
      return;
    }

    try {
      const data = await updateCategory(editingId, { name });
      setSuccess(data.message || "Category updated");
      cancelEdit();
      await refresh();
    } catch (e) {
      setError(e?.response?.data?.message || "Update failed (are you admin?)");
    }
  };

  const onDelete = async (id) => {
    setError("");
    setSuccess("");

    const ok = confirm("Delete this category?");
    if (!ok) return;

    try {
      const data = await deleteCategory(id);
      setSuccess(data.message || "Category deleted");
      await refresh();
    } catch (e) {
      setError(e?.response?.data?.message || "Delete failed (are you admin?)");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Categories</h1>
          <p className={`text-sm ${ADMIN_THEME.muted}`}>
            Create, edit, and delete product categories.
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error ? (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </div>
      ) : null}

      {/* Create + Search */}
      <div className={`${ADMIN_THEME.card} p-4`}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* New Category */}
          <div className="md:col-span-6">
            <label className={`mb-1 block text-xs ${ADMIN_THEME.muted}`}>
              New Category
            </label>
            <div className="flex gap-2">
              <AdminInput
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Speakers"
              />
              <AdminButton onClick={onCreate}>Add</AdminButton>
            </div>
          </div>

          {/* Search */}
          <div className="md:col-span-6">
            <label className={`mb-1 block text-xs ${ADMIN_THEME.muted}`}>
              Search
            </label>
            <AdminInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories..."
            />
          </div>

          <div className="md:col-span-12 pt-2">
            <div className={`text-sm ${ADMIN_THEME.muted}`}>
              {loading ? "Loading..." : `Showing ${filtered.length} categories`}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`${ADMIN_THEME.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-950/40">
              <tr className={`border-b ${ADMIN_THEME.divider}`}>
                <Th>Name</Th>
                <Th>Created</Th>
                <Th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Actions
                </Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-400">
                    Loading categories…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c._id}
                    className={`border-b ${ADMIN_THEME.divider} hover:bg-slate-950/30 transition`}
                  >
                    <td className="px-4 py-3 text-sm text-slate-100">
                      {editingId === c._id ? (
                        <AdminInput
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        c.name
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-300">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {editingId === c._id ? (
                          <>
                            <AdminButton variant="ghost" onClick={cancelEdit} className="px-3 py-1.5 text-sm">
                              Cancel
                            </AdminButton>
                            <AdminButton onClick={onUpdate} className="px-3 py-1.5 text-sm">
                              Save
                            </AdminButton>
                          </>
                        ) : (
                          <>
                            <AdminButton
                              variant="ghost"
                              className="px-3 py-1.5 text-sm"
                              onClick={() => startEdit(c)}
                            >
                              Edit
                            </AdminButton>
                            <AdminButton
                              variant="danger"
                              className="px-3 py-1.5 text-sm"
                              onClick={() => onDelete(c._id)}
                            >
                              Delete
                            </AdminButton>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
