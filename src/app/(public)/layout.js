import Header from "../components/header";
import { UserProvider } from "../context/userContext";

export default function PublicLayout({ children }) {
  return (
    <UserProvider>
      <Header showAuth={false} showNavigation={false} />
      <main>{children}</main>
    </UserProvider>
  );
}
