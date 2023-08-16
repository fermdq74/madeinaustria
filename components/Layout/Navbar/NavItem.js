import Link from "next/link";

const NavItem = (props) => {
  return (
    <Link href={props.slug}>
        {props.text}
    </Link>
  );
};

export default NavItem;