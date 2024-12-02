import { MdOutlinePayment } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { GrHistory } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useCartStore } from '@/providers/cartStore';
import { useUserStore } from '@/providers/userStore';

export default function Avatar() {
  const { data: session } = useSession();
  const { user } = useUserStore();
  const { cart, setCart } = useCartStore();

  async function handleSignOut(): Promise<void> {
    try {
      saveCartBeforeLogout();
      setCart([])
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("user", JSON.stringify("disconnect"));

      await signOut({ redirect: false });
      window.location.assign("http://localhost:3000/");
      document.cookie = "next-auth.session-token=; Max-Age=0; path=/";
      document.cookie = "next-auth.callback-url=; Max-Age=0; path=/";
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  }
  const saveCartBeforeLogout = async () => {
    if (session && user?.id) {
      console.log("log out")
      try {
        await axios.post(`http://localhost:3000/api/saveCart`, {
          userId: user.id,
          cart: cart,
        });
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  };
  return (
    <>
      <DropdownMenu.Root  >
        <DropdownMenu.Trigger className="p-2 dark:bg-gray-900">
          <a
            className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
            href="#"
            id="dropdownMenuButton2"
            role="button"
            aria-expanded="false"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                className="rounded-full border-2 border-gray-600"
                style={{ height: "32px", width: "32px" }}
                alt="User Avatar"
                loading="lazy"
              />
            ) : (
              <FaUserCircle size={27} className="text-lg text-gray-600" />
            )}
          </a>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" dark:bg-gray-900 dark:text-white absolute z-10 min-w-[200px] overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg shadow-sm right-1 top-2"
            align="end"
          >
            <DropdownMenu.Item className=" mb-2 flex items-center p-2 rounded-md cursor-pointer dark:hover:bg-gray-800 hover:bg-slate-100">
              <Link href="/userDetails" className="flex items-center">
                <FaCircleUser className="text-lg text-gray-600 dark:text-white hover:text-black" />
                <p className="text-slate-800 font-medium ml-3 dark:text-white">My Profile</p>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="mb-2 flex items-center p-2 rounded-md cursor-pointer dark:hover:bg-gray-800 hover:bg-slate-100">
              <Link href="/userOrders" className="flex items-center">
                <GrHistory className="text-lg text-gray-600 dark:text-white" />
                <p className="text-slate-800 font-medium ml-3 dark:text-white">My Orders</p>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="mb-2 flex items-center p-2 rounded-md cursor-pointer dark:hover:bg-gray-800 hover:bg-slate-100">
              <Link href="/favorites" className="flex items-center">
                <CiHeart className="text-lg text-gray-600 dark:text-white" />
                <p className="text-slate-800 font-medium ml-3 dark:text-white">Favorites</p>
              </Link>
            </DropdownMenu.Item>


            <DropdownMenu.Separator className="my-1 border-t border-slate-200" />

            <DropdownMenu.Item
              className="mb-2 flex items-center dark:text-white p-2 rounded-md cursor-pointer dark:hover:bg-gray-800 hover:bg-slate-100"
              onClick={handleSignOut}
            >
              <GoSignOut className="text-lg text-gray-600 dark:text-white" />
              <p className="text-slate-800 font-medium ml-3 dark:text-white">Sign Out</p>
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
