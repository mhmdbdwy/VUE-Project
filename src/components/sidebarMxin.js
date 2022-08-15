const sidebarMixin = {
    data() {
        return {
            activeClass: "active",
        }
    },
    computed: {
        currentPage() {
            return this.$route.path;
        }
    }
}
export default sidebarMixin