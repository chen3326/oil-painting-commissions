"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Lead {
  url: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  size: string;
  timeline: string;
  reference: string;
  ready: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeads = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/leads?password=${encodeURIComponent(pw)}`
      );
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setError("Incorrect password.");
          return;
        }
        throw new Error("Failed to fetch leads.");
      }
      const data = await res.json();
      setLeads(data);
      setAuthenticated(true);
    } catch {
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    fetchLeads(password);
  };

  const handleRefresh = () => {
    fetchLeads(password);
  };

  const handleDelete = async (url: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, password }),
      });
      if (!res.ok) throw new Error("Failed to delete lead.");
      setLeads((prev) => prev.filter((lead) => lead.url !== url));
    } catch {
      setError("Failed to delete lead. Please try again.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setLeads([]);
    setError("");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 bg-white p-8 rounded-lg shadow"
        >
          <h1 className="text-xl font-semibold text-center">Admin Login</h1>
          <div>
            <Label htmlFor="admin-password" className="mb-1.5">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-[rgb(68,68,68)] hover:bg-[rgb(88,88,88)]"
            disabled={loading}
          >
            {loading ? "Logging in\u2026" : "Log in"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? "Refreshing\u2026" : "Refresh"}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {leads.length === 0 && !loading ? (
          <p className="text-muted-foreground">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Timeline</th>
                  <th className="px-4 py-3 font-medium">Reference</th>
                  <th className="px-4 py-3 font-medium">Ready</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={i} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.subject}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.size}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.timeline}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.reference}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.ready}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDelete(lead.url)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
