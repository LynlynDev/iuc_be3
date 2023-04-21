import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "../../components/footer";
import NavBar from "../../components/Header";

export default function Home() {
  return (
    <div>
      <NavBar />

      <Footer />
    </div>
  );
}
