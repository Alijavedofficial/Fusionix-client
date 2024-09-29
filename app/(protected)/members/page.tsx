'use client';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Member } from '@/Types';



const members: Member[] = [
  { id: '1', name: 'Owner Name', email: 'owner@example.com', role: 'owner' },
  { id: '2', name: 'Editor One', email: 'editor1@example.com', role: 'editor' },
  { id: '3', name: 'Editor Two', email: 'editor2@example.com', role: 'editor' },
];

const MembersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'owner' | 'editor' | 'all'>('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value as 'owner' | 'editor' | 'all');
  };

  const filteredMembers = members
    .filter((member) =>
      (filterRole === 'all' || member.role === filterRole) &&
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.role === 'owner') return -1;
      if (b.role === 'owner') return 1;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Members</h1>

      {/* Search and Filter */}
      <div className="flex justify-start gap-2 items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg py-2 pl-10 w-full"
          />
          <Icon
            icon="ic:twotone-search"
            className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400"
            width="20"
            height="20"
          />
        </div>

        <select
          value={filterRole}
          onChange={handleRoleFilterChange}
          className="border border-gray-300 rounded-lg py-2.5 px-4"
        >
          <option value="all">All Roles</option>
          <option value="owner">Owner</option>
          <option value="editor">Editor</option>
        </select>
      </div>

      {/* Members Table */}
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Member</th>
            <th className="py-2 px-4 text-center">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr
              key={member.id}
              className={`border-b ${
                member.role === 'owner' ? 'bg-gray-200 text-gray-500' : ''
              }`}
            >
              <td className="py-2 px-4">{member.email}</td>
              <td className="py-2 px-4 capitalize text-center">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersPage;
