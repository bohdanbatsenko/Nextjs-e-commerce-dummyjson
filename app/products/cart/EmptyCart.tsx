import Link from "next/link";
import Button from "@/components/Button";
const EmptyCart = () => {
  return (
    <main>
      <div className='w-full my-8 flex justify-center'>
        <div className='empty-cart text-center'>
          <h2 className="text-2xl mb-6">
            Your cart is <span>empty</span>
          </h2>
          <Button>
            <Link href='/products'>Shop now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EmptyCart;