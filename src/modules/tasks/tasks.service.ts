import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Create task for the logged-in user
  async createTask(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  // Get all tasks belonging to the logged-in user
  async getUserTasks(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get a single task by ID (must belong to the user)
  async getTaskById(userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }

    return task;
  }

  // Update a task (must belong to the user)
  async updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
    // Check if task exists and belongs to user
    await this.getTaskById(userId, taskId);

    return this.prisma.task.update({
      where: { id: taskId },
      data: dto,
    });
  }

  // Delete a task (must belong to the user)
  async deleteTask(userId: string, taskId: string) {
    // Check if task exists and belongs to user
    await this.getTaskById(userId, taskId);

    await this.prisma.task.delete({
      where: { id: taskId },
    });

    return { message: 'Task deleted successfully' };
  }
}