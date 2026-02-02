import React, { useState } from "react";
import Topbar from "../components/Topbar";

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    name: "Roshni",
    email: "roshni@goldcorp.com",
    phone: "9876543210",
    department: "HR",
  });

  const [preferences, setPreferences] = useState({
    theme: "Light Mode",
    notifications: "Enabled",
    language: "English",
    timezone: "IST",
  });

  const handlePasswordChange = () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    alert("Password changed successfully!");
    setShowPasswordForm(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleProfileUpdate = () => {
    if (!profileData.name || !profileData.email) {
      alert("Name and Email are required.");
      return;
    }
    alert("Profile updated successfully!");
    setShowProfileForm(false);
  };

  const handlePreferencesSave = () => {
    alert("Preferences updated successfully!");
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    // Add actual logout logic here (clear tokens, redirect, etc.)
  };

  return (
    <div className="flex-1">
      <Topbar
        onProfileUpdate={() => setShowProfileForm(true)}
        onPasswordChange={() => setShowPasswordForm(true)}
        onLogout={handleLogout}
      />
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Settings</h2>

        {/* Preferences */}
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h3 className="text-lg font-medium">Preferences</h3>

          {/* Theme */}
          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Theme:</label>
            <select
              value={preferences.theme}
              onChange={(e) =>
                setPreferences({ ...preferences, theme: e.target.value })
              }
              className="border px-3 py-2 rounded"
            >
              <option>Light Mode</option>
              <option>Dark Mode</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Notifications:</label>
            <select
              value={preferences.notifications}
              onChange={(e) =>
                setPreferences({ ...preferences, notifications: e.target.value })
              }
              className="border px-3 py-2 rounded"
            >
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Language:</label>
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences({ ...preferences, language: e.target.value })
              }
              className="border px-3 py-2 rounded"
            >
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-4">
            <label className="w-32 font-medium">Timezone:</label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                setPreferences({ ...preferences, timezone: e.target.value })
              }
              className="border px-3 py-2 rounded"
            >
              <option>IST</option>
              <option>GMT</option>
              <option>PST</option>
              <option>EST</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handlePreferencesSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Change Password Modal */}
        {showPasswordForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <input
                type="password"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, oldPassword: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Profile Modal */}
        {showProfileForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              <input
                type="text"
                placeholder="Name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Department"
                value={profileData.department}
                onChange={(e) =>
                  setProfileData({ ...profileData, department: e.target.value })
                }
                className="border px-3 py-2 rounded w-full"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowProfileForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}