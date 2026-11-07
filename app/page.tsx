import Replica from '@/components/replica/Replica';
import MobileSite from '@/components/mobile/MobileSite';

export default function Home() {
  return (
    <main>
      {/* ≥900px: dizayn rasmiga aynan mos versiya; <900px: moslashuvchan mobil versiya */}
      <Replica />
      <MobileSite />
    </main>
  );
}
