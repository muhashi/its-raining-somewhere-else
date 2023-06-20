
export default function Footer() {
  return (
    <footer style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1em',
    }}>
      <span>&copy; <a href="https://muhashi.com">muhashi</a></span>
      <span>&bull;</span>
      <span><a href="https://www.youtube.com/watch?v=YidmA4DCjGc">music by toby fox</a></span>
    </footer>

  );
}
