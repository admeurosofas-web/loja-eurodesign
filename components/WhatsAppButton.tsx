export default function WhatsAppButton() {
  const mensagem = encodeURIComponent(
    'Olá! Vim pelo site da EuroDesign e gostaria de mais informações.'
  );

  return (
    <a
      href={`https://wa.me/5511913371140?text=${mensagem}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-[100]
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-2xl
      "
    >
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 fill-white"
        aria-hidden="true"
      >
        <path d="M16.04 3C9.39 3 4 8.29 4 14.82c0 2.29.67 4.52 1.94 6.43L4 28l6.96-1.82a12.2 12.2 0 0 0 5.08 1.1h.01C22.69 27.28 28 21.99 28 15.46 28 8.93 22.69 3 16.04 3zm0 21.9c-1.7 0-3.37-.45-4.82-1.3l-.35-.2-4.13 1.08 1.1-4-.23-.37a9.73 9.73 0 0 1-1.5-5.29c0-5.25 4.45-9.52 9.93-9.52 5.47 0 9.92 4.27 9.92 9.52 0 5.25-4.45 10.08-9.92 10.08zm5.45-7.12c-.3-.14-1.76-.85-2.03-.95-.27-.1-.47-.14-.67.14-.2.29-.77.95-.94 1.15-.17.19-.35.21-.64.07-.3-.14-1.25-.45-2.38-1.43-.88-.77-1.47-1.72-1.64-2.01-.17-.29-.02-.44.13-.58.13-.13.3-.34.45-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.08-.14-.67-1.58-.92-2.16-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.36-.27.29-1.04 1-1.04 2.44 0 1.44 1.07 2.83 1.22 3.02.15.19 2.1 3.15 5.09 4.42.71.3 1.27.48 1.7.61.71.22 1.36.19 1.87.12.57-.08 1.76-.71 2.01-1.39.25-.68.25-1.26.17-1.39-.07-.12-.27-.19-.57-.33z" />
      </svg>
    </a>
  );
}