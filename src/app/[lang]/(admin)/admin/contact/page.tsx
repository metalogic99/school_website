"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";

interface Contact {
  _id: string;
  fullName: string;
  email: string;
  contact: string;
  subject: string;
  companyName: string | null;
  companyLocation: string | null;
  description: string;
}

const ContactsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { toast } = useToast();
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id: string) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        title: "Contact Delete Successfully",

        variant: "success",
      });
      fetchContacts();
      return;
    } else {
      toast({
        title: "Sorry something went wrong. ",
      });
      return;
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-semibold">Contacts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Full Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Contact
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Subject
              </th>

              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{contact.fullName}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.contact}</td>
                  <td className="px-4 py-2">{contact.subject}</td>

                  <td className="px-4 py-2">{contact.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
