<script setup>
import Windows98Window from '@/components/Windows98Window.vue'


defineProps({
    title: {
        type: String,
        required: true
    },
    change: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <!--
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/home"><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="20" height="20" /></RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/skills">Skills</RouterLink>
                <RouterLink to="/experience">Experience</RouterLink>
                <RouterLink to="/education">Education</RouterLink>
                <RouterLink to="/projects">Projects</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
            </nav>
        </div>
    </header>
    -->
    <div ref="draggableContainer" :class="'window ' + title.replaceAll(/\s/g,'')">
        <div v-for="direction in ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw']" 
            :class="'resize-handle ' + direction" 
            :key="'resize-handle-' + direction"
            @mousedown="resizeMouseDown($event, direction)">
        </div>
        <Windows98Window :title="title" :change="change" :dragMouseDown="dragMouseDown" />
    </div>
</template>

<script>
export default {
    name: 'WindowModal',
    data: function () {
        return {
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0,
                startWidth: undefined,
                startHeight: undefined,
                resizing: false
            }
        }
    },
    methods: {
        dragMouseDown: function (event) {
            event.preventDefault()
            // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            // set the element's new position:
            this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
            this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
        }, 
        resizeMouseDown: function (event, direction) {
            event.preventDefault();
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            this.positions.startWidth = this.$refs.draggableContainer.clientWidth;
            this.positions.startHeight = this.$refs.draggableContainer.clientHeight;
            this.positions.resizing = true;
            document.onmousemove = (e) => this.resizeMove(e, direction);
            document.onmouseup = this.closeResizeElement;
        },
        resizeMove: function (event, direction) {
            if (!this.positions.resizing) return;
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            let newWidth = this.positions.startWidth;
            let newHeight = this.positions.startHeight;
            if (direction.includes('e')) {
                newWidth -= this.positions.movementX;
                this.$refs.draggableContainer.style.width = newWidth + 'px';
            }
            if (direction.includes('s')) {
                newHeight -= this.positions.movementY;
                this.$refs.draggableContainer.style.height = newHeight + 'px';
            }
            if (direction.includes('w')) {
                newWidth += this.positions.movementX;
                this.$refs.draggableContainer.style.width = newWidth + 'px';
                //move window left with resize
                this.$refs.draggableContainer.style.left = (this.$refs.draggableContainer.offsetLeft - this.positions.movementX) + 'px'
            }
            if (direction.includes('n')) {
                newHeight += this.positions.movementY;
                this.$refs.draggableContainer.style.height = newHeight + 'px';
                //move window top with resize
                this.$refs.draggableContainer.style.top = (this.$refs.draggableContainer.offsetTop - this.positions.movementY) + 'px'
            }
            // Update the stored mouse positions for the next movement event
            this.positions.clientX = event.clientX;
            this.positions.clientY = event.clientY;
            this.positions.startWidth = newWidth;
            this.positions.startHeight = newHeight;
        },
        closeResizeElement: function () {
            document.onmouseup = null;
            document.onmousemove = null;
            this.positions.resizing = false;
        }
    }
}
</script>

<style>
.window {
    position: fixed;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% - 45px + 10px);
    z-index: 100;
    display: grid;
    grid-template-rows: 5px 1fr 5px;
    grid-template-columns: 5px 1fr 5px;
    resize: both;        /* Enable resizing */
}

.resize-handle.n {
    grid-area: 1 / 2 / 2 / 3;
    cursor: n-resize;
}
.resize-handle.e {
    grid-area: 2 / 3 / 3 / 4;
    cursor: e-resize;
}
.resize-handle.s {
    grid-area: 3 / 2 / 4 / 3;
    cursor: s-resize;
}
.resize-handle.w {
    grid-area: 2 / 1 / 3 / 2;
    cursor: w-resize;
}
.resize-handle.ne {
    grid-area: 1 / 3 / 2 / 4;
    cursor: ne-resize;
}
.resize-handle.nw {
    grid-area: 1 / 1 / 2 / 2;
    cursor: nw-resize;
}
.resize-handle.se {
    grid-area: 3 / 3 / 4 / 4;
    cursor: se-resize;
}
.resize-handle.sw {
    grid-area: 3 / 1 / 4 / 2;
    cursor: sw-resize;
}

.window-content {
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    min-width: 750px;
    min-height: 352px;
}

@media (min-width: 1024px) {
    .window {
        width: 750px;
        height: 352px;
        top: 10%;
        left: 10%;
    }
}
</style>