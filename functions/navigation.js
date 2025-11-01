export async function handler(event, context) {
  const navList = [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard',
          icon: 'feather icon-home',
          classes: 'nav-item'
        }
      ]
    },
    // add your full navigation JSON here
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(navList),
  };
}
