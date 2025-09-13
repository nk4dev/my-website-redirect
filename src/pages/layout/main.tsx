import React from 'react';
import { signOut } from "next-auth/react";
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
            <header style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ margin: 0 }}>NknightA pages</Link>
                <button
                    onClick={() => signOut()}
                    style={{ background: '#f44336', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
                >
                    Logout
                </button>
            </header>
            <main>{children}</main>
            <footer style={{ marginTop: 20, borderTop: '1px solid #ccc', paddingTop: 10 }}>
                <p>&copy; 2021 Nknight AMAMIYA@nknigha.me</p>
            </footer>
        </div>
    );
}
