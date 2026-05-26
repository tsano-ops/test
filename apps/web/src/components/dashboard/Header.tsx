import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const displayName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user?.email?.split('@')[0] ?? 'My Account';
  const initials = user?.profile
    ? `${user.profile.firstName?.[0] ?? ''}${user.profile.lastName?.[0] ?? ''}`
    : 'SJ';
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const notifications = [
    { priority: 'info', label: 'INFO', time: 'Just Now', title: 'Document Successfully Uploaded', desc: "Your will document has been securely uploaded and verified. It's now part of your digital legacy." },
    { priority: 'medium', label: 'MEDIUM PRIORITY', time: '1 hour ago', title: 'Upcoming Task Deadline', desc: "Your bank account review is due in 2 days. Don't forget to complete this important task." },
    { priority: 'high', label: 'HIGH PRIORITY', time: '2 hours ago', title: 'Task Reminder: Add Emergency Contacts', desc: "You have a high-priority task that's due today. Adding emergency contacts is crucial for your plan." },
    { priority: 'info', label: 'INFO', time: 'Yesterday', title: 'New Network Member Added', desc: "Nadya has been added as your Executor. They'll receive notifications about important updates." },
    { priority: 'low', label: 'LOW PRIORITY', time: '3 days ago', title: 'Completed health questionnaire', desc: 'Congratulations! You have completed your entire health questionnaire.' },
    { priority: 'info', label: 'INFO', time: '1 week ago', title: 'Letter Draft Saved', desc: 'Your letter to Emily has been automatically saved as a draft in your Emotional Legacy section.' },
    { priority: 'medium', label: 'MEDIUM PRIORITY', time: '1 week ago', title: 'Insurance Policy Expiring Soon', desc: 'Your life insurance policy expires in 30 days. Review and update your coverage details.' },
    { priority: 'info', label: 'INFO', time: '2 weeks ago', title: 'Profile Updated Successfully', desc: 'Your contact information has been updated. All linked family members have been notified.' },
    { priority: 'high', label: 'HIGH PRIORITY', time: '2 weeks ago', title: 'Beneficiary Confirmation Required', desc: 'Please confirm the beneficiary details for your retirement account to keep your plan current.' },
    { priority: 'low', label: 'LOW PRIORITY', time: '3 weeks ago', title: 'New Article: Digital Legacy Guide', desc: 'A new resource is available in your library about managing digital accounts after passing.' },
    { priority: 'info', label: 'INFO', time: '1 month ago', title: 'Annual Plan Review Reminder', desc: "It's been a year since your last full plan review. Consider scheduling time to update your records." },
  ];

  return (
    <>
      <div className="header">
        <div className="header-inner">
          {/* Left: Hamburger + Logo */}
          <div className="header-col header-col-left">
            <div className="hamburger-btn" id="hamburgerBtn">
              <svg className="btn-outline" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><defs><linearGradient id="circle-grad-ham" x1="0.189" y1="0.126" x2="0.831" y2="0.86" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#fff"/><stop offset="0.133" stopColor="#fff" stopOpacity="0"/><stop offset="0.856" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff"/></linearGradient></defs><path d="M30,1A29.008,29.008,0,0,0,18.712,56.721,29.008,29.008,0,0,0,41.288,3.279,28.818,28.818,0,0,0,30,1m0-1A30,30,0,1,1,0,30,30,30,0,0,1,30,0Z" fill="url(#circle-grad-ham)"/></svg>
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </div>
            <div className="logo-pill" id="logoPill" onClick={() => navigate('/dashboard')}>
              <svg className="logo-outline" xmlns="http://www.w3.org/2000/svg" width="215" height="60" viewBox="0 0 215 60"><defs><linearGradient id="logo-grad" x1="0.463" x2="0.537" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#fff"/><stop offset="0.184" stopColor="#fff" stopOpacity="0"/><stop offset="0.825" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff"/></linearGradient></defs><path d="M30,1A29.008,29.008,0,0,0,18.712,56.721,28.817,28.817,0,0,0,30,59H185A29.008,29.008,0,0,0,196.288,3.279,28.817,28.817,0,0,0,185,1H30m0-1H185a30,30,0,0,1,0,60H30A30,30,0,0,1,30,0Z" fill="url(#logo-grad)"/></svg>
              <svg className="logo-text-svg" xmlns="http://www.w3.org/2000/svg" width="155" height="20" viewBox="0 0 155 20"><path d="M-556.741-472.732a8.936,8.936,0,0,1-1.918-2.587l1.134-1.564a7.587,7.587,0,0,0,1.905,1.648,5.108,5.108,0,0,0,2.581.65,3.914,3.914,0,0,0,2.255-.674,4.737,4.737,0,0,0,1.616-1.925,6.788,6.788,0,0,0,.6-2.936,6.44,6.44,0,0,0-.543-2.744,4.5,4.5,0,0,0-1.5-1.817,3.829,3.829,0,0,0-2.2-.65,3.7,3.7,0,0,0-2.316.866,10.8,10.8,0,0,0-2.171,2.443c-.482.71-.989,1.5-1.5,2.347l-1.061,1.769a36.988,36.988,0,0,1-2.2,3.321,10.694,10.694,0,0,1-2.762,2.635,6.147,6.147,0,0,1-3.389.951,5.7,5.7,0,0,1-3.57-1.191,7.644,7.644,0,0,1-2.4-3.309,13.046,13.046,0,0,1-.844-4.886,12.674,12.674,0,0,1,.82-4.8,7.33,7.33,0,0,1,2.316-3.177,5.46,5.46,0,0,1,3.389-1.143,5.918,5.918,0,0,1,4.052,1.769,8.942,8.942,0,0,1,1.918,2.7l-1.085,1.5a8.009,8.009,0,0,0-1.978-1.733,5.107,5.107,0,0,0-2.581-.65,3.947,3.947,0,0,0-2.231.674,4.6,4.6,0,0,0-1.628,1.925,6.793,6.793,0,0,0-.6,2.936,6.476,6.476,0,0,0,.543,2.744,4.4,4.4,0,0,0,1.5,1.817,3.775,3.775,0,0,0,2.195.65,3.585,3.585,0,0,0,2.34-.891,12.358,12.358,0,0,0,2.171-2.443c.495-.71,1-1.516,1.508-2.359l1-1.661.109-.181c.711-1.155,1.435-2.226,2.147-3.189a10.615,10.615,0,0,1,2.762-2.66,6.081,6.081,0,0,1,3.377-.951,5.629,5.629,0,0,1,3.546,1.191,7.8,7.8,0,0,1,2.376,3.309v.012a13.04,13.04,0,0,1,.844,4.885,12.846,12.846,0,0,1-.82,4.826,7.241,7.241,0,0,1-2.292,3.177A5.457,5.457,0,0,1-552.677-471,5.94,5.94,0,0,1-556.741-472.732Zm45.4.289a3.1,3.1,0,0,1-1.013-2.491,3.389,3.389,0,0,1,.422-1.709,3.806,3.806,0,0,1,1.435-1.348,10.567,10.567,0,0,1,2.714-1.035c.482-.132.965-.265,1.423-.385s.941-.241,1.4-.373a1.253,1.253,0,0,0,.2-.048v-.83a4.709,4.709,0,0,0-.277-1.781,1.624,1.624,0,0,0-.82-.915,3.245,3.245,0,0,0-1.411-.265,6.476,6.476,0,0,0-1.194.108.354.354,0,0,0-.1.024l-.181,1.36a2.243,2.243,0,0,1-.543,1.492,1.538,1.538,0,0,1-1.134.457,1.534,1.534,0,0,1-1.073-.349,1.688,1.688,0,0,1-.507-.89,3.818,3.818,0,0,1,1.773-2.635,7.053,7.053,0,0,1,3.883-.963,6.428,6.428,0,0,1,2.605.457,3.307,3.307,0,0,1,1.616,1.468,5.4,5.4,0,0,1,.555,2.647v5.716a1.42,1.42,0,0,0,.229.9.826.826,0,0,0,.675.289,1.308,1.308,0,0,0,.531-.108h-.012a1.641,1.641,0,0,0,.446-.253l.458.927a3.172,3.172,0,0,1-1.085.987,3.117,3.117,0,0,1-1.568.373,2.736,2.736,0,0,1-1.99-.71,2.858,2.858,0,0,1-.76-1.588h-.3a14.025,14.025,0,0,1-1,1.167,3.867,3.867,0,0,1-1.194.855,3.911,3.911,0,0,1-1.688.325A3.7,3.7,0,0,1-511.345-472.444Zm6.054-6.077c-.579.18-1.146.361-1.713.53a4.106,4.106,0,0,0-1.363.626,2.07,2.07,0,0,0-.687.818,2.4,2.4,0,0,0-.193.987,1.794,1.794,0,0,0,.555,1.408,2.131,2.131,0,0,0,1.483.505,2.481,2.481,0,0,0,.977-.192,5.965,5.965,0,0,0,.977-.554c.157-.108.326-.229.494-.361v-3.935C-504.941-478.629-505.11-478.581-505.291-478.521Zm63.51,6.113a5.444,5.444,0,0,1-2.255-2.262,7.428,7.428,0,0,1-.784-3.526,7.612,7.612,0,0,1,.808-3.6,5.853,5.853,0,0,1,2.255-2.395,6.38,6.38,0,0,1,3.28-.854,6.063,6.063,0,0,1,2.882.65,4.589,4.589,0,0,1,1.893,1.817,5.5,5.5,0,0,1,.676,2.768,7.619,7.619,0,0,1-.048.939c-.036.277-.085.529-.133.758h-8.261a5.76,5.76,0,0,0,.507,2.214,3.776,3.776,0,0,0,1.447,1.637,3.9,3.9,0,0,0,2.1.554,4.521,4.521,0,0,0,2.1-.433v-.024a5.129,5.129,0,0,0,1.483-1.179l.929.746a7.577,7.577,0,0,1-1.278,1.552,5.064,5.064,0,0,1-1.737,1.059,6.84,6.84,0,0,1-2.4.373A7.172,7.172,0,0,1-441.781-472.408Zm1.761-10.71a3.521,3.521,0,0,0-1.073,1.625,7.419,7.419,0,0,0-.374,2.106h4.571a1.178,1.178,0,0,0,.687-.553,2.173,2.173,0,0,0,.169-.915,3.535,3.535,0,0,0-.3-1.516,2.209,2.209,0,0,0-.844-.939,2.5,2.5,0,0,0-1.315-.325A2.468,2.468,0,0,0-440.02-483.118ZM-451.948-472.5a3.444,3.444,0,0,1-.965-2.708c0-.361,0-.722.012-1.059s.012-.722.012-1.131v-5.56h-5.005v5.463c0,.6.012,1.215.012,1.829s.012,1.24.012,1.853v.289l2.267.2v1.36h-7.429v-1.36l1.869-.181v-.3c.012-.614.012-1.24.012-1.853v-7.28h-1.966v-1.42l2.062-.265a11.2,11.2,0,0,1,.386-2.106,6.316,6.316,0,0,1,.736-1.625,6.421,6.421,0,0,1,1.049-1.227,4.628,4.628,0,0,1,1.737-1.071,6.311,6.311,0,0,1,2.074-.349,4.276,4.276,0,0,1,1.954.4,1.978,1.978,0,0,1,1.049,1.251,1.513,1.513,0,0,1-.446,1.047,1.711,1.711,0,0,1-1.23.421,1.959,1.959,0,0,1-1.158-.337,4.832,4.832,0,0,1-1-.951l-.675-.782a1.678,1.678,0,0,0-.386.457,4.4,4.4,0,0,0-.482.915,5.435,5.435,0,0,0-.314,1.167,9.512,9.512,0,0,0-.145,1.564v1.24h5.5l1.013-3.634h1.906l-.217,3.634h3.28v1.673h-3.22v7.521a1.984,1.984,0,0,0,.4,1.372,1.483,1.483,0,0,0,1.122.421,2.527,2.527,0,0,0,.808-.132l.012-.012a3.86,3.86,0,0,0,.712-.337l.591,1.059a2.683,2.683,0,0,1-.736.674,4.491,4.491,0,0,1-1.134.517,5.08,5.08,0,0,1-1.483.2A3.8,3.8,0,0,1-451.948-472.5Zm20.961.578v-1.36l1.821-.168v-.193c.012-.638.012-1.288.012-1.961v-4.416c0-.361-.012-.7-.012-1.035s-.012-.674-.012-1.023l-1.966-.132v-1.24l4-1.42.772.132.289,3.43.181.024v.072h.133a7.863,7.863,0,0,1,.941-2.046,4.465,4.465,0,0,1,1.23-1.276,2.685,2.685,0,0,1,1.5-.433,2.192,2.192,0,0,1,1.387.433l-.024.024a2.035,2.035,0,0,1,.736,1.107,2.545,2.545,0,0,1-.531,1.468,1.594,1.594,0,0,1-1.327.59,2.117,2.117,0,0,1-1.049-.253,3.155,3.155,0,0,1-.808-.7l-.072-.072a5.541,5.541,0,0,0-1.158,1.035,7.7,7.7,0,0,0-.965,1.564v4.164c0,.674.012,1.324.012,1.961v.168l2.364.193v1.36Zm-58.746,0v-1.36l1.7-.168v-.193c0-.638.012-1.288.012-1.949s.012-1.276.012-1.865v-2.575a3.207,3.207,0,0,0-.482-2,1.838,1.838,0,0,0-1.508-.578,3.868,3.868,0,0,0-1.194.192,5.618,5.618,0,0,0-1.23.566,7.873,7.873,0,0,0-.7.469v3.923c0,.566,0,1.179.012,1.853s.012,1.324.012,1.961v.2l1.628.156v1.36h-6.73v-1.36l1.821-.168v-.193c.012-.638.012-1.288.012-1.961v-4.416c0-.361-.012-.7-.012-1.035s-.012-.674-.012-1.023l-1.93-.132v-1.24l3.944-1.42.772.132.314,2.419h.229a7.924,7.924,0,0,1,1.254-1.408,5.622,5.622,0,0,1,1.5-.951,4.419,4.419,0,0,1,1.761-.349,3.492,3.492,0,0,1,2.8,1.119,5.05,5.05,0,0,1,.965,3.357v3.069c0,.578.012,1.2.012,1.865s.012,1.312.012,1.949l.012.024v.193l1.749.168v1.36Zm17.4-.024v-1.492l2.376-.132-1.182-3.526h-6.006l-1.158,3.49,2.279.169v1.492h-6.018v-1.492l2.05-.156,5.439-15.523h2.738l5.524,15.572,1.93.108v1.492Zm.675-6.667-2.653-7.954-.531,2.551-1.8,5.4Zm-65.6,6.667v-1.492l2.316-.132V-487.4l-2.316-.144v-1.492h7.357a12.046,12.046,0,0,1,4.161.614h.024a5.14,5.14,0,0,1,2.436,1.769,4.716,4.716,0,0,1,.8,2.744,5.065,5.065,0,0,1-.784,2.756,5.243,5.243,0,0,1-2.5,1.925,11.911,11.911,0,0,1-4.318.686v-1.468a5.538,5.538,0,0,0,2.3-.457,2.8,2.8,0,0,0,1.351-1.336,4.711,4.711,0,0,0,.422-2.058,3.6,3.6,0,0,0-.977-2.744,4.49,4.49,0,0,0-3.148-.914h-1.266c-.012.361-.012.722-.012,1.083-.012.878-.012,1.745-.012,2.623v6.751c0,.818.012,1.661.012,2.515.012.325.012.638.012.963l2.6.144v1.492Zm16.209-.012v-1.36l1.869-.168v-.313c.012-.614.012-1.24.012-1.853V-488.22l-2.014-.385v-1.155l4.487-.951.8.132-.048,3.393v9.7c0,.6.012,1.215.012,1.829s.012,1.24.012,1.853l.012-.012v.325l1.882.168v1.36Z" transform="translate(575 491)" fill="#000"/></svg>
            </div>
          </div>

          <div className="header-spacer" />

          {/* Right: Search, Bell, Avatar */}
          <div className="header-col header-col-right">
            <div className="utility-group">
              <div className="utility-btn search-btn" id="searchBtn">
                <svg className="btn-outline" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><defs><linearGradient id="circle-grad-search" x1="0.189" y1="0.126" x2="0.831" y2="0.86" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#fff"/><stop offset="0.133" stopColor="#fff" stopOpacity="0"/><stop offset="0.856" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff"/></linearGradient></defs><path d="M30,1A29.008,29.008,0,0,0,18.712,56.721,29.008,29.008,0,0,0,41.288,3.279,28.818,28.818,0,0,0,30,1m0-1A30,30,0,1,1,0,30,30,30,0,0,1,30,0Z" fill="url(#circle-grad-search)"/></svg>
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="21.811" height="21.811" viewBox="0 0 21.811 21.811"><path d="M23,23l-5.774-5.774m0,0a8.333,8.333,0,1,0-11.785,0A8.333,8.333,0,0,0,17.225,17.225Z" transform="translate(-2.249 -2.249)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>
              </div>
              <div
                className={`utility-btn bell-btn ${notifOpen ? 'active' : ''}`}
                id="notifBtn"
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
              >
                <svg className="btn-outline" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><defs><linearGradient id="circle-grad-notif" x1="0.189" y1="0.126" x2="0.831" y2="0.86" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#fff"/><stop offset="0.133" stopColor="#fff" stopOpacity="0"/><stop offset="0.856" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff"/></linearGradient></defs><path d="M30,1A29.008,29.008,0,0,0,18.712,56.721,29.008,29.008,0,0,0,41.288,3.279,28.818,28.818,0,0,0,30,1m0-1A30,30,0,1,1,0,30,30,30,0,0,1,30,0Z" fill="url(#circle-grad-notif)"/></svg>
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10,20a3.88,3.88,0,0,1-3.694-2.663,3.778,3.778,0,0,1-.174-1.474,25.944,25.944,0,0,1-5.053-1.28.749.749,0,0,1-.3-1.211A8.385,8.385,0,0,0,3,7.689V6.917A7,7,0,0,1,17,6.917v.771a8.385,8.385,0,0,0,2.211,5.684.75.75,0,0,1-.3,1.211,25.925,25.925,0,0,1-5.051,1.28,3.769,3.769,0,0,1-.412,2.042,3.839,3.839,0,0,1-2.274,1.913A3.917,3.917,0,0,1,10,20M7.626,16.042a2.285,2.285,0,0,0,.11.833,2.388,2.388,0,0,0,2.991,1.512,2.349,2.349,0,0,0,1.394-1.168,2.3,2.3,0,0,0,.253-1.177,26.7,26.7,0,0,1-4.748,0m-.5-1.561a24.93,24.93,0,0,0,5.753,0l.03,0a24.445,24.445,0,0,0,4.491-.963A9.861,9.861,0,0,1,15.5,7.688V6.917a5.5,5.5,0,0,0-11.006,0v.771A9.862,9.862,0,0,1,2.6,13.515a24.437,24.437,0,0,0,4.492.963.259.259,0,0,1,.029,0M19.249,6.125a.749.749,0,0,1-.738-.623,8.412,8.412,0,0,0-2.075-4.248A.75.75,0,1,1,17.545.245a9.9,9.9,0,0,1,2.444,5,.751.751,0,0,1-.613.866.785.785,0,0,1-.127.01m-18.5,0a.785.785,0,0,1-.127-.01.751.751,0,0,1-.613-.866,9.9,9.9,0,0,1,2.444-5A.75.75,0,1,1,3.564,1.254,8.412,8.412,0,0,0,1.489,5.5a.749.749,0,0,1-.738.623" fill="#000"/></svg>
                <div className="notif-dot" />
              </div>
              <div
                className="avatar-btn"
                id="profileBtn"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
              >
                <div className="avatar-photo-inner" style={{ overflow: 'hidden', borderRadius: '50%' }}>
                  {/* Photo removed — showing initials fallback */}
                  <span className="initials">{initials}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="profile-dropdown-backdrop" onClick={() => setProfileOpen(false)} />
      )}
      <div ref={profileRef} className={`profile-dropdown ${profileOpen ? 'open' : ''}`}>
        <div className="profile-dropdown-header">
          <div className="profile-dropdown-name">{displayName}</div>
          <div className="profile-dropdown-email">{user?.email || ''}</div>
        </div>
        <div className="profile-dropdown-section section-primary">
          <div className="profile-dropdown-item" onClick={() => { navigate('/profile'); setProfileOpen(false); }}>
            <span>My Profile</span>
            <svg className="dd-icon" width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="5" r="4"/><path d="M1 19c0-3.866 3.134-7 7-7s7 3.134 7 7"/></svg>
          </div>
          <div className="profile-dropdown-item"><span>Settings</span></div>
          <div className="profile-dropdown-item"><span>Privacy & Security</span></div>
          <div className="profile-dropdown-item"><span>Plan Overview</span></div>
          <div className="profile-dropdown-item"><span>Billing & Subscription</span></div>
        </div>
        <div className="profile-dropdown-section section-secondary">
          <div className="profile-dropdown-item"><span>Help & Support</span></div>
          <div className="profile-dropdown-item"><span>Terms & Privacy</span></div>
        </div>
        <div className="profile-dropdown-section section-logout">
          <div className="profile-dropdown-item" onClick={logout}>
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {notifOpen && (
        <div className="notif-backdrop" onClick={() => setNotifOpen(false)} />
      )}
      <div className={`notif-panel ${notifOpen ? 'open' : ''}`}>
        <div className="notif-panel-header">
          <div className="notif-badge" id="notifBadgeCount">11</div>
          <div className="notif-panel-title">Notifications</div>
        </div>
        <div className="notif-actions">
          <button className="notif-action-btn">Mark All as Read</button>
          <button className="notif-action-btn">Clear All</button>
        </div>
        <div className="notif-list" id="notifList">
          {notifications.map((n, i) => (
            <div key={i} className={`notif-item priority-${n.priority}`}>
              <div className="notif-bar" />
              <div className="notif-item-meta">
                <span className={`notif-priority ${n.priority}`}>{n.label}</span>
                <div className="notif-dot-sep" />
                <span className="notif-time">{n.time}</span>
              </div>
              <div className="notif-item-title">{n.title}</div>
              <div className="notif-item-desc">{n.desc}</div>
            </div>
          ))}
        </div>
        <div className="notif-footer">
          <div className="notif-footer-line" />
          <div className="notif-footer-label">View All Notifications</div>
        </div>
      </div>
    </>
  );
}
