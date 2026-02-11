
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, 
  UserCircle, 
  Trophy, 
  FileCheck, 
  Settings, 
  Printer, 
  Users, 
  ChevronRight, 
  LogOut, 
  Bell, 
  Plus, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  BookOpen
} from 'lucide-react';

// Types
type Role = 'mahasiswa' | 'prodi' | 'operator';

interface Achievement {
  id: string;
  name: string;
  category: string;
  year: string;
  status: 'Pending' | 'Verified' | 'Rejected';
}

interface Application {
  id: string;
  studentName: string;
  nim: string;
  prodi: string;
  status: 'Menunggu' | 'Terverifikasi' | 'Selesai';
}

// Components
// Fix: Added key?: React.Key to the props type definition to allow passing the reserved 'key' prop in list renders
const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void, key?: React.Key }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

// Fix: Made children optional to resolve TS errors where the compiler might not correctly detect JSX children as props
const Card = ({ title, children, className = "" }: { title: string, children?: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl border border-slate-100 shadow-sm ${className}`}>
    <h3 className="text-lg font-semibold mb-4 text-slate-800">{title}</h3>
    {children}
  </div>
);

const App = () => {
  const [role, setRole] = useState<Role>('mahasiswa');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  // Mock Data
  const achievements: Achievement[] = [
    { id: '1', name: 'Juara 1 Debat Ekonomi Nasional', category: 'Prestasi', year: '2023', status: 'Verified' },
    { id: '2', name: 'Sertifikasi Analis Keuangan Syariah', category: 'Sertifikasi', year: '2023', status: 'Pending' },
  ];

  const applications: Application[] = [
    { id: '101', studentName: 'Ahmad Fauzi', nim: '1910203001', prodi: 'Perbankan Syariah', status: 'Menunggu' },
    { id: '102', studentName: 'Siti Aminah', nim: '1910203042', prodi: 'Ekonomi Syariah', status: 'Terverifikasi' },
    { id: '103', studentName: 'Budi Santoso', nim: '1910203055', prodi: 'Akuntansi Syariah', status: 'Menunggu' },
  ];

  // Role Configurations
  // Fix: Explicitly type the menus object to ensure item properties are correctly inferred in the SidebarItem mapping
  const menus: Record<Role, { id: string, label: string, icon: any }[]> = {
    mahasiswa: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'biodata', label: 'Biodata Diri', icon: UserCircle },
      { id: 'aktivitas', label: 'Aktivitas & Prestasi', icon: Trophy },
    ],
    prodi: [
      { id: 'verifikasi', label: 'Verifikasi Pengajuan', icon: FileCheck },
      { id: 'isian', label: 'Isian SKPI Prodi', icon: BookOpen },
      { id: 'akun', label: 'Manajemen Akun', icon: Users },
    ],
    operator: [
      { id: 'antrean', label: 'Antrean Cetak', icon: Printer },
      { id: 'akun', label: 'Manajemen Akun', icon: Settings },
    ],
  };

  // Views
  const RenderDashboardMahasiswa = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Status Pengajuan" className="md:col-span-2">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-600 p-3 rounded-full text-white">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-emerald-700 font-medium uppercase tracking-wider">Tahapan Saat Ini</p>
                <h4 className="text-xl font-bold text-emerald-900">Verifikasi Berkas</h4>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full text-xs font-bold uppercase">Proses</span>
          </div>
          <div className="mt-6 space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                    Kemajuan SKPI
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">65%</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"></div>
              </div>
            </div>
            <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm">
              Ajukan Pemutakhiran SKPI
            </button>
          </div>
        </Card>
        <Card title="Statistik Ringkas">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Total Prestasi</span>
              <span className="font-bold text-lg">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Sertifikasi</span>
              <span className="font-bold text-lg">4</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Organisasi</span>
              <span className="font-bold text-lg">2</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const RenderBiodata = () => (
    <Card title="Informasi Akademik & Pribadi">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
          <input type="text" value="Ahmad Fauzi" className="w-full px-4 py-2 border rounded-lg bg-slate-50" readOnly />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">NIM</label>
          <input type="text" value="1910203001" className="w-full px-4 py-2 border rounded-lg bg-slate-50" readOnly />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Program Studi</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
            <option>Perbankan Syariah</option>
            <option>Ekonomi Syariah</option>
            <option>Akuntansi Syariah</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tahun Masuk</label>
          <input type="number" defaultValue="2019" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-slate-700">Alamat Korespondensi</label>
          <textarea className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" rows={3}></textarea>
        </div>
        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-max">Simpan Perubahan</button>
      </form>
    </Card>
  );

  const RenderAktivitas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Daftar Aktivitas & Prestasi</h2>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Tambah Data</span>
        </button>
      </div>
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nama Aktivitas</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Kategori</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Tahun</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {achievements.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                <td className="px-6 py-4 text-slate-600">{item.year}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RenderVerifikasiProdi = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Antrean Verifikasi SKPI</h2>
      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-emerald-300 transition-all">
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center text-slate-500">
                <UserCircle size={28} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{app.studentName}</h4>
                <p className="text-sm text-slate-500">{app.nim} • {app.prodi}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                app.status === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {app.status}
              </span>
              <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium">Review Berkas</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RenderAntreanCetak = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Antrean Cetak Dokumen</h2>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID Pengajuan</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nama Mahasiswa</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Prodi</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">Cetak</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {applications.filter(a => a.status === 'Terverifikasi').map((app) => (
              <tr key={app.id} className="hover:bg-emerald-50/30">
                <td className="px-6 py-4 font-mono text-sm">#SKPI-{app.id}</td>
                <td className="px-6 py-4 font-medium">{app.studentName}</td>
                <td className="px-6 py-4 text-slate-600">{app.prodi}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-transform active:scale-95">
                    <Printer size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    if (role === 'mahasiswa') {
      switch (activeMenu) {
        case 'dashboard': return <RenderDashboardMahasiswa />;
        case 'biodata': return <RenderBiodata />;
        case 'aktivitas': return <RenderAktivitas />;
        default: return <RenderDashboardMahasiswa />;
      }
    } else if (role === 'prodi') {
      switch (activeMenu) {
        case 'verifikasi': return <RenderVerifikasiProdi />;
        case 'isian': return <Card title="Pengaturan Kurikulum Prodi"><p className="text-slate-500">Formulir isian capaian pembelajaran lulusan program studi...</p></Card>;
        case 'akun': return <Card title="Daftar Mahasiswa Prodi"><p className="text-slate-500">Manajemen akses dan reset password mahasiswa...</p></Card>;
        default: return <RenderVerifikasiProdi />;
      }
    } else if (role === 'operator') {
      switch (activeMenu) {
        case 'antrean': return <RenderAntreanCetak />;
        case 'akun': return <Card title="Manajemen Pengguna Sistem"><p className="text-slate-500">Konfigurasi hak akses operator dan staf...</p></Card>;
        default: return <RenderAntreanCetak />;
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 glass-effect border-r border-slate-200 hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="flex items-center space-x-3 text-emerald-700 mb-8">
            <div className="bg-emerald-700 p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">SKPI FEBI</h1>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">UIN Datokarama Palu</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menus[role].map((item) => (
              <SidebarItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeMenu === item.id}
                onClick={() => setActiveMenu(item.id)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-slate-50">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {role === 'mahasiswa' ? 'AF' : role === 'prodi' ? 'PR' : 'OP'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-slate-800 uppercase">{role}</p>
              <p className="text-xs text-slate-500 truncate">Sesi Aktif</p>
            </div>
            <LogOut size={16} className="text-slate-400 cursor-pointer hover:text-red-500" />
          </div>
          
          {/* Role Switcher for Demo */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Simulasi Role</p>
            <div className="flex flex-col gap-1">
              {(['mahasiswa', 'prodi', 'operator'] as Role[]).map((r) => (
                <button 
                  key={r}
                  onClick={() => { setRole(r); setActiveMenu(menus[r][0].id); }}
                  className={`text-xs text-left px-2 py-1 rounded capitalize transition-colors ${role === r ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen">
        {/* Header */}
        <header className="h-20 glass-effect border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center md:hidden space-x-3 text-emerald-700">
            <BookOpen size={24} />
            <h1 className="font-bold text-lg">SKPI FEBI</h1>
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-slate-500">Selamat datang kembali,</h2>
            <p className="text-lg font-bold text-slate-800">Fakultas Ekonomi dan Bisnis Islam</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer hover:bg-slate-100 p-2 rounded-full transition-colors">
              <Bell size={20} className="text-slate-600" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {notifications}
                </span>
              )}
            </div>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-slate-700 hidden sm:inline-block">Admin Panel</span>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="h-10 w-10 rounded-full border-2 border-emerald-500" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
